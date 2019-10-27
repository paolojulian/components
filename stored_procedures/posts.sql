
DELIMITER ;;
CREATE PROCEDURE userPosts(IN userId int(11))
LANGUAGE SQL
BEGIN
	SELECT * FROM posts
	WHERE share_id IS NULL
	AND user_id = userId
	OR user_id IN (	
		SELECT following_id FROM followers
		WHERE user_id = userId
	)
	UNION
	SELECT * FROM posts
	WHERE id in (SELECT share_id FROM posts where share_id IS NOT NULL and user_id = userId);
END ;;
DELIMITER ;

call userPosts(1)