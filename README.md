
update dans une modal 
implementer tanstack dans TOUT le projet //! a verifier !!!!!!!!!!!!!!!!!
<!-- clean code  -->


mes question 



  useEffect(() => {
    setAllLikesForOneNews(likes.length);
    setLikeByMe(likes.find((like) => like.user.id === user?.id));
  }, [likes, user?.id]);
