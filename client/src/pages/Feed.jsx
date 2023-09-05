import React, {useEffect, useState} from "react";
import { MoreHorizontal, Heart, Repeat, MessageCircle, Send } from 'react-feather';
import Tweet from "../components/Tweet";

const Feed = () => {
    const [tweets, setTweets] = useState()

    useEffect(() => {
      getTweets()
    }, [])

    const getTweets = async () => {

    }

  return (
    <div className="container mx-auto max-w-[600px]">

     <Tweet/>
     <Tweet/>
     <Tweet/>
     <Tweet/>
    </div>
  );
};

export default Feed;
