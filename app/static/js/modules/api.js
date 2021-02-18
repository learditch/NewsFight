export default {
  testText: () => {
    return "Test text";
  },

  getArticles: async (topic, uploadData) => {
    var timeout = new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${5} second`));
      }, 5 * 1000);
    });

    try {
      const fetchPro = fetch(`${window.origin}/search/${topic}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      const res = await Promise.race([fetchPro, timeout]);
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch (err) {
      throw err;
    }
  }
};
