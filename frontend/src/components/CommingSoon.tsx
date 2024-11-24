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

  "https://media.discordapp.net/attachments/991693504520663080/1310273912826892298/waaa-lhox.gif?ex=67449f2c&is=67434dac&hm=43cca6fb7268e64acf08dc725fa6f09f29504d4a0328fb0bd9a708379b1ba2ed&=",
  "https://media.discordapp.net/attachments/1183075201580286063/1274862271029444649/Twitchonline-video-cutter.com-ezgif.com-video-to-gif-converter.gif?ex=674455c3&is=67430443&hm=cabef5f4943b17d60f3822c9dcba9571935192fe8607822ea356a1db057a093a&=",
  "https://media.discordapp.net/attachments/621099308694896660/1215084214773350461/mathe_t9louza.gif?ex=6744649b&is=6743131b&hm=0fcca070aacd9fe31cb7eed0e8ecd9d04e8cef1e3bd8aaeb8d2174e8d0168aa4&="


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
