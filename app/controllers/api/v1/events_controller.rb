class API::V1::EventsController < ApplicationController
  helper_method :getMatchingEvents
  helper_method :getMatchingDayEvents
  helper_method :uniqueEvents

  before_filter :restrict_access, except: :create_token

  respond_to :json, except: :curate

  # http_basic_authenticate_with name: Figaro.env.api_name, password: Figaro.env.api_password

  def create_token
    @apikey = APIKey.create!
    respond_with @apikey
  end

  def index
    @events = Event.all
    respond_with @events
  end

  def today
    @eventsToday = uniqueEvents(getMatchingDayEvents)
    
    filter_events

    respond_with @eventsToday
  end

  def curate 
    # NTD: ensure admin
    @eventsToday = uniqueEvents(getMatchingDayEvents + getMatchingDayEvents(Date.today + 1))

    filter_events

    respond_to do |format|
      format.html{}
    end

  end

  def tomorrow
    @eventsToday = uniqueEvents(getMatchingDayEvents(Date.today + 1))
    
    filter_events

    respond_with @eventsToday
  end

  def all
    @eventsToday = uniqueEvents(Event.all)
    
    filter_events

    respond_with @eventsToday
  end

  def partyEvents
    @eventsToday = uniqueEvents(getMatchingDayEvents).select{|event| event.source == "Nowmagazine" || event.source == "Club Crawlers" || event.source == "Just Shows"}
    filter_events
    
    respond_with @eventsToday
  end

  private

    def filter_events
      @eventsToday = @eventsToday.select{|event| event.categoryList.include?(params[:cat])} if params[:cat]
      @eventsToday = @eventsToday[0..params[:limit].to_i] if params[:limit]
      @eventsToday = @eventsToday.select{|event| event.latitude != nil }
    end

    def restrict_access
      api_key = APIKey.find_by_access_token(params[:access_token])
      expired = api_key != nil && api_key.expires_on != nil && Date.today < Date.parse(api_key.expires_on)
      head :unauthorized unless api_key && expired
    end

    # def restrict_access
    #   authenticate_or_request_with_http_token do |token, options|
    #   ApiKey.exists?(access_token: token)
    # end
end
