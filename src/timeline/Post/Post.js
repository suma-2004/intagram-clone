import React, { useState } from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ user, postImage, likes, timestamp }) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };

  const handleCommentClick = () => {
    setShowCommentSection(true);
  };

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleCommentSend = () => {
    if (commentInput.trim() !== "") {
      const newComment = {
        user: "You", // Assuming the user sending the comment is the current user
        message: commentInput,
      };
      setComments([...comments, newComment]);
      setCommentInput("");
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          {user} • <span>{timestamp}</span>
        </div>
      </div>
      <div className="post__image">
        <img src={postImage} alt="Post Image" />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
            <FavoriteBorderIcon
              className={`postIcon ${liked ? "liked" : ""}`}
              onClick={handleLikeClick}
              disabled={liked}
            />
            <ChatBubbleOutlineIcon className="postIcon" onClick={handleCommentClick} />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        Liked by {likeCount} people.
      </div>
      {showCommentSection && (
        <div className="post__comments">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={handleCommentChange}
          />
          <button onClick={handleCommentSend}>Send</button>
          <div className="post__commentList">
            {comments.map((comment, index) => (
              <div key={index} className="post__comment">
                <span>{comment.user}</span>: {comment.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;