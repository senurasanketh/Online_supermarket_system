import React from "react";

function UserUpdateDetailsFor() {
  return (
    <div>
      <form>
        <lable>Name*</lable>
        <input type="text" name="name" id="name" />
        <lable>Email*</lable>
        <input type="email" name="email" id="email" />
        <lable>Address*</lable>
        <input type="text" name="address" id="address" />
        <lable>Phone NO*</lable>
        <input type="text" name="phoneno" id="phoneno" />
        <button>Update</button>
      </form>
    </div>
  );
}

export default UserUpdateDetailsFor;
