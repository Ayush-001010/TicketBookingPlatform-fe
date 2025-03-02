import React from "react";

const FirstDescription: React.FunctionComponent<{}> = () => {
  return <div>
    <p>Hi there! 👋 To help us gather all the necessary details about your train, please carefully fill out the form below. Your accurate input ensures smooth processing and helps us serve you better.Here are a few guidelines to assist you:</p>
    <ul>
        <li>Train Name: Type in the official name of the train. Please avoid using any special characters or numbers.</li>
        <li>Train Code: Enter the unique code for the train. This should include a combination of letters and numbers, without any special characters.</li>
        <li>Type of Coach: Choose the type of coach from the dropdown menu (e.g., Sleeper, AC, General).</li>
        <li>Type of Train: Select the type of train (e.g., Express, Passenger, Freight) from the provided options. Special characters are not allowed.</li>
        <li>Running Schedule: Indicate the days and timings when the train operates (e.g., Mon-Fri, 10:00 AM - 6:00 PM).</li>
        <li>From Place: Enter the name of the departure station. No special characters, please.</li>
        <li>To Place: Enter the name of the destination station. Again, no special characters.</li>
    </ul>
  </div>;
};

export default FirstDescription;
