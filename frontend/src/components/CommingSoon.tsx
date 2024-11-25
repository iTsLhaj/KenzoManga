import React, { useState, useEffect } from 'react';



interface CommingSoonProps {
  text: React.ReactNode; // This allows you to pass any JSX element as the text
}

const images: string[] = [
  
  "https://i.pinimg.com/736x/28/b8/5d/28b85d886a3fe6ec3df60016773e99b1.jpg",
  "https://i.pinimg.com/736x/03/bc/36/03bc362f778cba7e0351186e8488a944.jpg",
  "https://i.pinimg.com/control2/736x/f9/3e/b2/f93eb2ba6d33295fcd5a25b22de7540d.jpg",
  "https://i.pinimg.com/736x/cb/72/a7/cb72a74d9db66b411a31eaca7f64e177.jpg",
  "https://i.pinimg.com/control2/736x/e9/20/77/e92077cdfc26c47e1f74cc89c0aa3f7b.jpg",
  "https://i.pinimg.com/originals/e3/a4/22/e3a4224b609b45b86c2c3acebaae0eb6.gif",
  "https://i.pinimg.com/control2/736x/36/65/15/366515db21400955f26d3cdf424bfe5f.jpg"

]

const images_v2: string[] = [
	
	"https://media.discordapp.net/attachments/993902499658473574/1310624179141345351/lhwari1.gif?ex=6745e562&is=674493e2&hm=49c2cc4831819d69698d8ff6a1b146e10366b61f9dc5ff0aa1e5dc67eb42bd2d&=&width=550&height=310",
	"https://media.discordapp.net/attachments/993902499658473574/1310624198388879391/lhwari2.gif?ex=6745e567&is=674493e7&hm=1a655855e1c16b78085ddafecf7f8b2cafa2572d3edb79f4a55ceed703e893d1&=",
	"https://media.discordapp.net/attachments/993902499658473574/1310624214339944488/lhwari3.gif?ex=6745e56a&is=674493ea&hm=f78f9dae80b5594c3440345c9a750a9428f9e3bc2f2c5d8a4933731803fee5ec&=",
	"https://media.discordapp.net/attachments/993902499658473574/1310624233940058162/lmathe.gif?ex=6745e56f&is=674493ef&hm=dec885b47e2884270780d3e4608b8ea76170b65660ea35c16d0e1adb00cd2d61&=&width=550&height=310"

]

const CommingSoon: React.FC<CommingSoonProps> = ({ text }) => {

  const [randomImage, setRandomImage] = useState<string>(images_v2[0]);

  useEffect(() => {
    // Set a random image when the component mounts
    const randomIndex = Math.floor(Math.random() * images_v2.length);
    setRandomImage(images_v2[randomIndex]);
  }, []);

  return (
    <div className="h-screen flex justify-center items-start bg-black pt-32">
      <div className="text-center mt-10">
        <h1 className="text-white text-4xl font-regular p-10">
          {text}, Yalla ... <strong>GAW</strong>
        </h1>
        <div className='image-cover'>
          <img 
            src={randomImage}
            alt="Coming Soon"
            className="mb-4 w-[80rem] object-cover rounded-3xl" 
          />
        </div>
      </div>
    </div>
  );
};

export default CommingSoon;
