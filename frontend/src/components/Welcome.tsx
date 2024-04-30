function Welcome() {
    return (
        <div className=" container  ">
            <div className="card">
                <div className="card-header">
                    <h2>Welcome to the Client Connect Hub</h2>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <br />
                        The Client Connect Hub is designed to enhance seamless collaboration between our dedicated team of developers and
                        esteemed clients.
                    </h5>
                    <p className="card-text text-body-secondary">
                        <br /> To engage with our features, please log in or register. This will allow you full access to our interactive
                        tools.
                    </p>
                    <p className="card-text text-body-secondary">
                        {" "}
                        After registration, we encourage you to contact our support team with your account details. This ensures prompt
                        service tailored to your specific needs.
                    </p>
                    <p className="card-text text-body-secondary">
                        If you represent a client, please provide details about your company and projects of interest. Our project manager
                        will then connect you to relevant projects and discussions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
