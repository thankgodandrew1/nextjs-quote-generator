import mongoose, { Document, Schema, Model, models } from 'mongoose';

export interface IQuote extends Document {
  userId: string;
  content: string;
  categories: string[];
  tags: string[];
  author: string;
  createdAt: Date;
}

const QuoteSchema: Schema<IQuote> = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  categories: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Quote: Model<IQuote> = models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);

export default Quote;