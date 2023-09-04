import React from 'react'
import { MoreHorizontal, Heart, Repeat, MessageCircle, Send } from 'react-feather';


const Tweet = ({Tweet}) => {
  return (
    <div className="flex p-4">
    <img 
    className="w-10 h-10 rounded-full object-cover"
    src="https://placekitten.com/200/200"
    />

      <div className="w-full px-2 pb-4 border-b border-[rgba(49,49,50,1)]">
          {/* Tweets header */}
          <div className="flex justify-between gap-2">
            <strong>Username</strong>

            <div className="flex justify-between gap-2">
              <p className="text-[rgba(97,97,97,1)]">3 hours ago</p>
              <MoreHorizontal/>
            </div>
          </div>

          {/* Tweets body */}
            <div className="py-4">
              <span>Teslas are ugly</span>
            </div>

            <div className="flex gap-4 py-4">
              <Heart size={22}/>
              <MessageCircle size={22}/>
              <Repeat size={22}/>
              <Send size={22}/>
            </div>

            <div className="flex gap-4">
              <p className="text-[rgba(97,97,97,1)]">Replies 16</p>
              <p> • </p>
              <p className="text-[rgba(97,97,97,1)]">87 Likes</p>
            </div>

      </div>
  </div>
  )
}

export default Tweet