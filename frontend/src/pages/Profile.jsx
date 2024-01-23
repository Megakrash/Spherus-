import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaPen } from "react-icons/fa";
import UpdateUserByUser from "../components/profile/UpdateUserByUser";
import DeleteUser from "../components/profile/DeleteUser";
import Avatar from "../components/profile/Avatar";

function Profile({ iduser }) {
  const [user, setUser] = useState(null);

  const [firstnameUpdate, setFirstnameUpdate] = useState(false);
  const [lastnameUpdate, setLastnameUpdate] = useState(false);
  const [nicknameUpdate, setNicknameUpdate] = useState(false);
  const [birthdayUpdate, setBirthdayUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);

  function getUser() {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/users/${iduser}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUser();
  }, [iduser]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-conatainer">
      {user && (
        <div>
          <Avatar
            id={iduser}
            getUser={() => getUser()}
            photoSrc={
              user.url
                ? `${import.meta.env.VITE_PORT_BACKEND}/${user.url}`
                : "https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg"
            }
          />
          <div className="user-details-container">
            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Firstname</h2>
                <p>{user.firstname}</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(!firstnameUpdate);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                  aria-label="Update firstname"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {firstnameUpdate && (
                <UpdateUserByUser
                  type="text"
                  keyName="firstname"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setFirstnameUpdate}
                />
              )}
            </div>

            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Lastname</h2>
                <p>{user.lastname}</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(!lastnameUpdate);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                  aria-label="Update Lastname"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {lastnameUpdate && (
                <UpdateUserByUser
                  type="text"
                  keyName="lastname"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setLastnameUpdate}
                />
              )}
            </div>

            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Nickname</h2>
                <p>{user.nickname}</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(!nicknameUpdate);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                  aria-label="Update nickname"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {nicknameUpdate && (
                <UpdateUserByUser
                  type="text"
                  keyName="nickname"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setNicknameUpdate}
                />
              )}
            </div>

            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Birthday</h2>
                <p>{user.birthday}</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(!birthdayUpdate);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                  aria-label="Update birthday"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {birthdayUpdate && (
                <UpdateUserByUser
                  type="date"
                  keyName="birthday"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setBirthdayUpdate}
                />
              )}
            </div>

            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Email</h2>
                <p>{user.email}</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(!emailUpdate);
                    setPasswordUpdate(false);
                  }}
                  aria-label="Update email"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {emailUpdate && (
                <UpdateUserByUser
                  type="email"
                  keyName="email"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setEmailUpdate}
                />
              )}
            </div>

            <div className="fields-container">
              <div className="field-user">
                <h2 htmlFor="">Password</h2>
                <p>******</p>
                <button
                  className="btn-update-toggle"
                  type="button"
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(!passwordUpdate);
                  }}
                  aria-label="Update password"
                >
                  <FaPen className="pen" />
                </button>
              </div>
              {passwordUpdate && (
                <UpdateUserByUser
                  type="password"
                  keyName="password"
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setPasswordUpdate}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <DeleteUser id={iduser} />
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  iduser: PropTypes.number.isRequired,
};
