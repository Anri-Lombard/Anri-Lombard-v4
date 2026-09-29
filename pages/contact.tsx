// The site is one page now; keep old links (like the GitHub profile's "Get in touch") working.
export const getServerSideProps = () => ({ redirect: { destination: "/#contact", permanent: false } });

export default function Contact() {
  return null;
}
