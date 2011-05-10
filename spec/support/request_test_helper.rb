module RequestTestHelper

  def default_language
    request.env['HTTP_ACCEPT_LANGUAGE'] = I18n.locale.to_s
  end

end