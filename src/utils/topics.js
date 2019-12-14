const getTopicsIdList = (list = []) => {
    const topicsList = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!topicsList.includes(l.TopicId)) {
          topicsList.push(l.TopicId);
        }
      });
    }
    return topicsList;
};

module.exports = {
    getTopicsIdList
}
