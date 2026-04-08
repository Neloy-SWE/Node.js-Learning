import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispath = useDispatch();

    const saveProfile = async () => {
        try {
            setError("");
            const result = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
            },
                {
                    withCredentials: true,
                });

            dispath(addUser(result?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }



    return (
        <>
            <div className="flex justify-center my-30">
                <div className="flex justify-center mx-10">
                    <div className="card card-border bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center mb-5">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input w-full" placeholder="John"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input w-full" placeholder="Doe"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Photo URL</legend>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        className="input w-full" placeholder="https://example.com/photo.jpg"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="number"
                                        value={age}
                                        className="input w-full" placeholder="25"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>
                            </div>


                            {/* <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        value={gender}
                                        className="input w-full" placeholder="Male"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>
                            </div> */}

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>

                                </fieldset>
                            </div>

                            <div>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea
                                        value={about}
                                        className="textarea textarea-bordered w-full" placeholder="Tell us about yourself"
                                        onChange={(e) => setAbout(e.target.value)}
                                    ></textarea>
                                </fieldset>
                            </div>
                            <p className="text-error">{error}</p>
                            <div className="card-actions justify-center mt-5">
                                <button className="btn btn-primary btn-block" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} needAction={false} />
            </div>

            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>)}
        </>
    );
};

export default EditProfile;