import { useState } from "react";

const EditProfile = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");

    return (
        <>
            <div className="flex justify-center my-10">
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
                                <legend className="fieldset-legend">Age</legend>
                                <input
                                    type="number"
                                    value={age}
                                    className="input w-full" placeholder="25"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                        </div>


                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <input
                                    type="text"
                                    value={gender}
                                    className="input w-full" placeholder="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </fieldset>
                        </div>


                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <input
                                    type="text"
                                    value={about}
                                    className="input w-full" placeholder="Tell us about yourself"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>
                        </div>

                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-primary btn-block">Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;