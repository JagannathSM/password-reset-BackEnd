# TASK DETAILS

<div>
  <h1>Password Reset Flow Task</h1>
</div>
<div>
  <h3>Task Details:</h3>
  <ol>
    <li>Design Forgot password page, where user enter there email id</li>
    <li>Check if the user Exists in DB</li>
    <li>If user not present send error msg</li>
    <li>If the user is found generate the random string adn send a link with that random string to there email </li>
    <li>Store the random string in DB for later verification</li>
    <li>When user enters the link retrive the string and pass it to DB</li>
    <li>Check if the Random string matches</li>
    <li>Store the updated password and clear the radnom string in DB once the user submited the form</li>
    <li>If the string dose not match, send an error to user</li>
  </ol>
</div>

# BACK-END END-POINTS:

  1. /auth/register --> To register new User. [ Required : userName, email, password ]
  2. /auth/login --> To login the registered User. [ Required : email, password ]
  3. /auth/reset-pass --> To verify user email and send reset password link. [ Required : email ]
  4. /auth/update-pass/:resetPassToken --> To verify resetPassToken and create updated password for user. [ Required : newPassword ]
  5. /user/ --> To get logged in user details.
