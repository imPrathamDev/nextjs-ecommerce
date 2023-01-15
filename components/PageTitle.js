import Head from "next/head";

const PageTitle = ({ title, description, image, keywords }) => {
  return (
    <Head>
      <title>{title ? title : "Reale Gioielleria"}</title>
      <meta name="title" content={title ? title : "Reale Gioielleria"} />
      <meta
        name="description"
        content={description ? description : "eCommerce Website"}
      />
      {keywords.length > 0 && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Pratham Sharma" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
      <meta
        property="twitter:title"
        content={title ? title : "Reale Gioielleria"}
      />
      <meta
        property="twitter:description"
        content={description ? description : "eCommerce Website"}
      />
      <meta
        property="twitter:image"
        content={
          image
            ? image
            : `${process.env.NEXT_PUBLIC_HOST}/images/seo/og-image.png`
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
      <meta property="og:title" content={title ? title : "Reale Gioielleria"} />
      <meta
        property="og:description"
        content={description ? description : "eCommerce Website"}
      />
      <meta
        property="og:image"
        content={
          image
            ? image
            : `${process.env.NEXT_PUBLIC_HOST}/images/seo/og-image.png`
        }
      />
    </Head>
  );
};

export default PageTitle;
