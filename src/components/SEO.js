import Head from "next/head";

const SEO = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href="https://www.shivshaktiss.in/" />
    </Head>
  );
};

export default SEO;
