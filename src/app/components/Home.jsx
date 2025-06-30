import TypingEffect from "./TypingEffect";

export default function Home() {
  const introText = "I like coding. Welcome to my portfolio.";

  return (
    <main className="home-page">
      <TypingEffect text={introText} speed={100} as="h1" />
    </main>
  );
}