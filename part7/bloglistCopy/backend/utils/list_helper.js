const palindrome = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const total = array.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
  return array.length === 0 ? 0 : total;
};
// it returns the entire object, not just the likes, no need to add a .find()!
const favoriteBlog = (array) => {
  const mostLiked = array.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

module.exports = {
  dummy,
  palindrome,
  average,
  totalLikes,
  favoriteBlog,
};
