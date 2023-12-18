import Layout from "@/components/Layout";
import Quotes from "@/components/Quotes";
import React from 'react';
import Head from 'next/head';


export const siteTitle = 'Create | Be Inspired';

export default function QuotePage() {
    return (
        <Layout>
            <Head>
                <title>
                    {siteTitle}
                </title>
                
          <meta name='description' 
          content='User Quote Creation Page | Be Inspired Quote Generator Website'></meta>
          <meta name='viewport' 
          content='...'></meta>
             </Head>
            <div className="font-mono">
                <h1 className="text-3xl bg-blue-200 p-3 font-extrabold rounded-[10px]">Be a Creator! Create Inspiring Quotes Filled with Life and Love!!</h1>
                <Quotes />
            </div>
        </Layout>
    );
};