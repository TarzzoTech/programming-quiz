class TopicsListBuilder {
    constructor(topicsList) {
        this.topicsList = topicsList;
    }

    getInstance() {
        return this.topicsList.map(topic => {
            return {
                Id: topic._id,
                Name: topic.Name,
                Code: topic.Code,
                CreatedDate: topic.CreatedDate
            }
        });
    }
}

class TopicBuilder {
    constructor(topic) {
        this.topic = topic;
    }

    getInstance(isNew = true) {
        return {
            Id: isNew ? '' : this.topic._id,
            Name: this.topic.Name,
            Code: this.topic.Code,
            CreatedDate: isNew ? new Date() : this.topic.CreatedDate,
        };
    }
}

module.exports = {
    TopicsListBuilder,
    TopicBuilder
};