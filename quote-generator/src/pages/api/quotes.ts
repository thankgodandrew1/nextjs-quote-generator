import { connectToDatabase } from '@/utils/db';
import Quote, { IQuote } from '@/models/Quote';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const userSub = req.body.userSub || req.query.userSub;

    if (!userSub) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (req.method === 'GET') {
      const quotes = await Quote.find({ userId: userSub });
      res.status(200).json({ quotes });
    } else if (req.method === 'POST') {
      try {
        const { content, categories, tags, author } = req.body;
    
        const newQuote = new Quote({
          userId: userSub,
          content,
          categories,
          tags,
          author,
          createdAt: new Date(),
        });
    
        const savedQuote = await newQuote.save();
        res.status(201).json({ success: true, quote: savedQuote });
      } catch (error) {
        console.error('Error saving quote to the database:', error);
        res.status(500).json({ error: 'Error saving quote' });
      }
    }else if (req.method === 'PUT') {
      const { id, content, categories, tags, author } = req.body;

      const updatedQuote = await Quote.findOneAndUpdate(
        { _id: id, userId: userSub },
        {
          $set: {
            content,
            categories,
            tags,
            author,
            createdAt: new Date(),
          },
        },
        { new: true }
      );

      if (!updatedQuote) {
        return res.status(404).json({ error: 'Quote not found or unauthorized' });
      }

      res.status(200).json({ success: true, quote: updatedQuote });
    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      const deletedQuote = await Quote.findOneAndDelete({ _id: id, userId: userSub });

      if (!deletedQuote) {
        return res.status(404).json({ error: 'Quote not found or unauthorized' });
      }

      res.status(200).json({ success: true, deletedQuote });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}