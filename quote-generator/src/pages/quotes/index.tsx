import Layout from "@/components/Layout";
import Quotes from "@/components/Quotes";
import React from 'react';

export default function QuotePage() {
    return (
        <Layout>
            <div>
                <h1>Quotes Page</h1>
                <Quotes />
            </div>
        </Layout>
    );
};