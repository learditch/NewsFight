export default {
  testText: () => {
    return "Test text";
  },

  timeout: (s) => {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  },

  AJAX: async function (url, uploadData) {
    try {
      const fetchPro = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      const res = await Promise.race([fetchPro, timeout(5)]);
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  },
};
