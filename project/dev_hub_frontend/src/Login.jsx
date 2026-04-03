const Login = () => {
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="card card-border bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Email ID</legend>
                                <input type="text" className="input" placeholder="example@gmail.com" />
                            </fieldset>
                        </div>
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;