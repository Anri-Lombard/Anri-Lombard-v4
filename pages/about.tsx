// The site is one page now; keep old links working.
export const getServerSideProps = () => ({ redirect: { destination: "/#about", permanent: false } });

export default function About() {
  return null;
}
