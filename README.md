
update dans une modal 



mes question 



  useEffect(() => {
    setAllLikesForOneNews(likes.length);
    setLikeByMe(likes.find((like) => like.user.id === user?.id));
  }, [likes, user?.id]);
