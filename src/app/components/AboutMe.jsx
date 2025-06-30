import TypingEffect from "./TypingEffect";

export default function AboutMe() {
  const aboutText = `Hi, I'm Oliver Waldron, but you can call me Olly. I'm an aspiring software engineer with a passion for building web applications. I love coding and creating solutions that make people's lives easier. I've recently completed the Makers 14 week software engineering bootcamp, where I honed my skills in full-stack development. In my free time, I enjoy exploring new technologies and working on personal projects. I'm excited to share my journey with you!`;

  return (
    <div className="about-container">
      <div className="about-image-container"> 
        <img className="about-image" src="/olly.jpeg" alt="Olly Waldron" />
      </div>
        <div className="about-text-container">  
            <p>
               Hi, I'm Oliver Waldron, but you can call me Olly. I'm an aspiring software engineer with a passion for building web applications. I love coding and creating solutions that make people's lives easier. 
            </p>
            <p>
               I've recently completed the Makers 14 week software engineering bootcamp, where I honed my skills in full-stack development. I'm looking for my first job in the tech industry after spending the last 5 years in finance. In my free time, I enjoy exploring new technologies and working on personal projects, as well as rounds of golf and walking my sausage dog, Milo.
            </p>
            <p>
               I've had experience in a few different programming languages and frameworks, including JavaScript, React, Node.js, and Python. I'm always eager to learn new skills and take on new challenges. 
            </p>
        </div>
    </div>
);
}