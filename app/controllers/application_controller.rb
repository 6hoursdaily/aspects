class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
    I18n.locale = extract_locale_from_accept_language_header
    # I18n.locale = current_user.locale if current_user?
    I18n.locale = session[:locale] if session[:locale]    .
    I18n.locale = params[:locale] if params[:locale]
  end

  def default_url_options(options={})
    logger.debug "default_url_options is passed options: #{options.inspect}\n"
    { :locale => I18n.locale }
  end

  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end
end
