import { Helmet } from "react-helmet-async";

const SITE_URL = "https://nsolutions.in";

const SEO = ({
  title,
  description,
  keywords,
  path = "/",
  image = "/images/og-default.jpg",
  type = "website",
}) => {
  const canonicalUrl = `SITEURL{path}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `SITEURL{image}`;

  return (
    <Helmet>
      {/* ================= BASIC SEO ================= */}


      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* ================= LANGUAGE ================= */}

      <html lang="en-IN" />

      <meta
        httpEquiv="content-language"
        content="en-IN"
      />

      {/* ================= BRAND ================= */}


      <meta
        name="author"
        content="N Solutions"
      />

      <meta
        name="publisher"
        content="N Solutions"
      />

      <meta
        name="application-name"
        content="N Solutions"
      />

      <meta
        name="theme-color"
        content="#006CA8"
      />

      {/* ================= OPEN GRAPH ================= */}

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content="N Solutions"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:image:alt"
        content={`${title} | N Solutions`}
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      {/* ================= TWITTER / X ================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

    </Helmet>
  );
};

export default SEO;



