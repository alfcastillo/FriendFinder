# FriendFinder
Friend Finder Hedoku App


compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site will take in results from your users' surveys, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match.

Express is used to handle routing

#Survey

The personality survey has 10 questions. Each answer is in a scale of 1 to 5 based on how much the user agrees or disagrees with a question.
The app compares the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.

#Output
The closest match will be the user with the least amount of difference.

Once the current user's most compatible friend it found, the app displays the result as a  pop-up.