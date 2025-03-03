import { useRef, useState } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value.trim();
    const enteredNewPassword = newPasswordRef.current.value.trim();

    // Validation checks
    if (!enteredOldPassword) {
      setError("Old password cannot be empty.");
      return;
    }

    if (enteredNewPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (enteredOldPassword === enteredNewPassword) {
      setError("New password must be different from the old password.");
      return;
    }

    // Reset error state
    setError(null);

    // Call parent function to handle password change
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
