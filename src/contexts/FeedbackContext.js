import LocalStorageService from './LocalStorageContext'

const feedbackDataKey = 'feedbackData'

const FeedbackService = {

	saveFeedback(data) {
		const feedbackData = LocalStorageService.getData(feedbackDataKey, true);
		feedbackData.push(data);
		LocalStorageService.saveData(feedbackDataKey, feedbackData, true)
	},

	getFeedbackData() {
		return LocalStorageService.getData(feedbackDataKey, true)
	},

	setFeedbackData(data) {
		LocalStorageService.saveData(feedbackDataKey, data, true)
	}
};

export default FeedbackService;