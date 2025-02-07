let requestCount = 0;

function fetchData(callback) {
    setTimeout(() => {
        requestCount++;
        const success = requestCount % 5 !== 0;

        if (success) {
            const data = ["samarth", "vaibhav", "aditya", "David"];
            callback(null, data);
        } else {
            callback("Error: Server failed on this attempt", null);
        }
    }, 2000);
}

fetchData((error, data) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Fetched data:", data);
    }
});
