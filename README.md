# GalacticHorse [![Build Status](https://travis-ci.org/Callidon/GalacticHorse.svg?branch=master)](https://travis-ci.org/Callidon/GalacticHorse)
Un moteur de recherche enrichi dédié au handicap

A skeleton application for Google Cloud Endpoints in Java.

## Products
- [App Engine][1]

## Language
- [Java][2]

## APIs
- [Google Cloud Endpoints][3]
- [Google App Engine Maven plugin][4]

## Setup Instructions

1. Update the value of `application` in `appengine-web.xml` to the app
   ID you have registered in the App Engine admin console and would
   like to use to host your instance of this sample.

1. Add your API method to `src/main/java/${packageInPathFormat}/YourFirstAPI.java`.

1. Optional step: These sub steps are not required but you need this
   if you want to have auth protected methods.

    1. Update the values in `src/main/java/${packageInPathFormat}/Constants.java`
       to reflect the respective client IDs you have registered in the
       [APIs Console][6].

    1. You also need to supply the web client ID you have registered
       in the [APIs Console][4] to your client of choice (web, Android,
       iOS).

1. Run the application with `mvn appengine:devserver`, and ensure it's
   running by visiting your local server's api explorer's address (by
   default [localhost:8080/_ah/api/explorer][5].)

1. Get the client library with

   $ mvnappengine:endpoints_get_client_lib

   It will generate a client library jar file under the
   `target/endpoints-client-libs/<api-name>/target` directory of your
   project, as well as install the artifact into your local maven
   repository.

1. Deploy your application to Google App Engine with

   $ mvn appengine:update

[1]: https://developers.google.com/appengine
[2]: http://java.com/en/
[3]: https://developers.google.com/appengine/docs/java/endpoints/
[4]: https://developers.google.com/appengine/docs/java/tools/maven
[5]: https://localhost:8080/_ah/api/explorer
[6]: https://console.developers.google.com/
````
......................................................    
:                       P*,                          :    
:                       F :9                         :    
:                E.    $  :!?                        :    
:                F'M:  $   :!#.,                     :    
:                >':!L*"       .`P*                  :    
:                L   :         .  ~M4<(*             :    
:                 r /:         '!   ! `!!<.^"*       :        
:               ,"  ~.       9: !.  !  `M !!!!  "    :    
:              F   ~'!  :    !! `! :!:  X; `~`!:4x * :    
:              F/       /HL  !!  ~ !!!   M> \ X: M M :    
:             F/        MM$R!.     !~   :~!  >'M:?L4M:    
:            F~    :::  X!@!`Mk          ~`~ ' !M ! !:    
:          .\MX:!!!!!M8X!   XRMi         '  \ ! !>' ':    
:          .M$!!! ~!!HMRM M$RMMMM:             ~'!	 :    
:          .$M!!!   -=:^~MRMMMMMM!!:            )(>  :    
:          4RM!!   @  XM$MMMMMMM!\~!:                :    
:         :$MMM!   \!~\M$RMMMMMMMX >~MH   !!..       :    
:         :MMMM!:!!!XM8$$MMMMMMMMX>` !$8x  !!!!`:!   :    
:        F$8$MMX!!!!MMMMMMMMMMMMM!> ! !$$M  !!!!.!!> :    
:       F$$$$MMM!!!!MMMMMMMMMMMM!!~ :  !R$M  !!!X !Xh:    
:      *@$$$$$M!!!!?!'!MM!M!XMM!!!  !   !?RM '!!M! ~M:    
:     68$$$$$$!~~~~` !!!!!!!!!!!!~       !!?X `!MX  `:    
:     d$$$$$$X!X!~   `!!!!!!!!!!~ :`',    !!!! `!!X  :    
:    )MMM$$$MM!XHHM$X> `!!!!!~~  :    L   `!!!! '!!! :    
:   \MMMM$$RMMMMM$$R~          .d      r    !!!   !!.:    
:  FXMMMMMMMMM!?M?!       uuud`         L    !!!   !!:    
: $:MM$MMMMMXXX!!  <    .`               b    `!>  !!:    
: PX!9$MMMM$$$WMMM~    @                  N    !!.  .:    
:l ~ M$MMM$$$$$!!   .d`                    &   !!! .!:    
:F  . M$XM$$$$R.- u`                        k   ~!!!!:    
:  MR~ $>X$$ :> z`                           L   `!!!:    
:k     ? @$ X:'`                              >    `!:    
: k ~! !:! '$R:                               `.    !:    
:  L       !#~@                                 k   ':    
:   `c...  z                                      .  :    
:                                                  k :    
.....................................................    
````
