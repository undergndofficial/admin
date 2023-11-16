import reviewData from "../../reviewData";
import StarRating from 'react-star-rating-component'

function Reviews() {
  const reviews = reviewData

  const formatDate = (created_at) => {
    const currentTime = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifference = currentTime - createdAtDate;
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(monthsDifference / 12);

  if (yearsDifference > 0) {
    return `${yearsDifference}년 전`;
  } else if (monthsDifference > 0) {
    return `${monthsDifference}개월 전`;
  } else if (daysDifference > 0) {
    return `${daysDifference}일 전`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}시간 전`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference}분 전`;
  } else {
    return `${secondsDifference}초 전`;
  }
}
  return(
    <div className="reviewManage">
      <h3>
        리뷰 관리
      </h3>
      <div className="reviews">
        {
          reviews.map((review) => {
            return(
              <div className="reviewContainer">
                <div className="reviewInfo">
                  <div className="mem">{review.mem}</div>
                  <div className="date">{formatDate(review.created_at)}</div>
                </div>
                <div className="starring">
                  <StarRating name={`rating-${review.seq}`} starCount={review.starring} value={review.starring} />
                </div>
                <div className="comment">{review.review_comment}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Reviews;