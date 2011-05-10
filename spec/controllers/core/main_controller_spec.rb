require 'spec_helper'

describe Core::MainController do

  include RequestTestHelper

  before(:each) do
    default_language
  end

  describe "GET 'index'" do
    it "should be successful" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'getToolBarItems'" do
    it "should be successful" do
      get 'getToolBarItems'
      response.should be_success
    end
  end

  # TODO: Testing session locale and url locale
  # TODO: Testing authenticated user
end
