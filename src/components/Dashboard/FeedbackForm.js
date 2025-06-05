import React, { useState } from 'react';
import { useFeedback } from '../../hooks/useApi';
import { TRANSLATIONS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants';

const FeedbackForm = ({ language = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    suggestedTopic: '',
    feedback: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { submitFeedback, submitting, success, error } = useFeedback();
  const translations = TRANSLATIONS[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = language === 'sw' ? 'Jina linahitajika' : 'Name is required';
    }
    
    if (!formData.feedback.trim()) {
      errors.feedback = language === 'sw' ? 'Maoni yanahitajika' : 'Feedback is required';
    }
    
    if (formData.feedback.trim().length < 10) {
      errors.feedback = language === 'sw' ? 
        'Maoni yanapaswa kuwa na angalau herufi 10' : 
        'Feedback should be at least 10 characters long';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await submitFeedback({
        ...formData,
        timestamp: new Date().toISOString(),
        language: language
      });
      
      // Reset form on successful submission
      setFormData({
        name: '',
        suggestedTopic: '',
        feedback: ''
      });
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      suggestedTopic: '',
      feedback: ''
    });
    setFormErrors({});
  };

  return (
    <section className="bg-white p-6 rounded shadow mb-4 fade-in">
      <h2 className="text-xl font-semibold mb-4">{translations.shareYourFeedback}</h2>
      
      {/* Success Message */}
      {success && (
        <div className="success-message mb-4">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">✅</span>
            {language === 'sw' ? 'Asante kwa maoni yako!' : SUCCESS_MESSAGES.FEEDBACK_SUBMITTED}
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="error-message mb-4">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">❌</span>
            {error}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.yourName}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={language === 'sw' ? 'Andika jina lako' : 'Enter your name'}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kenya-green transition-colors ${
              formErrors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
            }`}
            disabled={submitting}
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Suggested Topic Input */}
        <div>
          <label htmlFor="suggestedTopic" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.suggestTopic}
          </label>
          <input
            type="text"
            id="suggestedTopic"
            name="suggestedTopic"
            value={formData.suggestedTopic}
            onChange={handleInputChange}
            placeholder={language === 'sw' ? 
              'Pendekeza mada au hashtag (hiari)' : 
              'Suggest a topic or hashtag (optional)'
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kenya-green hover:border-gray-400 transition-colors"
            disabled={submitting}
          />
        </div>

        {/* Feedback Textarea */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            {translations.yourFeedback}
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            placeholder={language === 'sw' ? 
              'Toa maoni yako kuhusu MaoniBot au mada za kidashbo...' : 
              'Share your thoughts about MaoniBot or suggest dashboard topics...'
            }
            rows={4}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kenya-green resize-vertical transition-colors ${
              formErrors.feedback ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
            }`}
            disabled={submitting}
          />
          {formErrors.feedback && (
            <p className="text-red-500 text-xs mt-1">{formErrors.feedback}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            {formData.feedback.length}/500 characters
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'kenya-green hover:bg-green-700 focus:ring-2 focus:ring-green-500'
            } text-white`}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div className="spinner w-4 h-4 mr-2"></div>
                {language === 'sw' ? 'Inatuma...' : 'Submitting...'}
              </div>
            ) : (
              translations.submitFeedback
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={submitting}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            {language === 'sw' ? 'Safisha' : 'Reset'}
          </button>
        </div>
      </form>
      
      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">
          {language === 'sw' ? 'Taarifa za Ziada:' : 'Additional Information:'}
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            {language === 'sw' ? 
              '• Maoni yako yanasaidia kuboresha MaoniBot' : 
              '• Your feedback helps improve MaoniBot'
            }
          </li>
          <li>
            {language === 'sw' ? 
              '• Hakuna taarifa za kibinafsi zinazohifadhiwa' : 
              '• No personal information is stored'
            }
          </li>
          <li>
            {language === 'sw' ? 
              '• Maoni yote yanachambuliwa kwa faragha' : 
              '• All feedback is analyzed privately'
            }
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FeedbackForm;