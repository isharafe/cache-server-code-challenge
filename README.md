# fashion-cloud-code-challenge
fashion cloud code challenge to create a caching system

Used Node version - v16.14.2

* npm install - install the necessary packages to your machine
* npm start - start the application
* npm test - start test cases for the application
  not completed

## Environment Configuration
when start the server, set the environment variable NODE_ENV to either "dev" or "prod"
this will pick the correct ".env" file with the related configuration for that environement.

At the moment, NODE_ENV="prod" is used the script (package.json -> scripts -> start)

update the related configs in "env/dev.env" or "env/prod.env"


## late Branch

I couldn't finish all the aspects with in the given time. I spent another 3 extra hrs for the rest and those changes are pushed to the "late" branch


## End points
* http://{host}/api/cache : GET http method
  * get all cache keys
* http://{host}/api/cache/{key} : GET http method
  * get cached value for this key (create a new cache value and return if no existing cache)
* http://{host}/api/cache/{key} : POST http method
  * body: {"key": {key-value}, "value": {value-to-cache}, "ttl": {cache-expiration-time-in-seconds} }
    * "key" -> required, "value" -> required, "ttl" -> optional (default value is 1000 seconds)
  * save a cache value for a given key
* http://{host}/api/cache/{key} : DELETE http method
  * delete value from cache for the given key
* http://{host}/api/cache : DELETE http method
  * delete all values from cache

## Features and Specifications
* Ennironment variables can be used with different variables.
  * create a file with name as "{env-name}.env" in "env" folder. put appropriate settings there
  * set the "NODE_ENV={env_name}" environment variable. The {env} file will be selected according to this "NODE_ENV" value.
  * currently this environment value has set to "prod" in the "start" script in package json.
    * so when you run "npm start" to start the application, values in "env/prod.env" file will be used
    * have used "cross-env" module to set the NODE_ENV variable. so that this should be work fine among different platforms (OS)
* Can use below environment variables for settings.
  * PORT={Number} - server running port
  * DB_NAME={String} - mongodb name
  * DB_CON_URL={String} - mongodb connection url
    * example url: mongodb://{DB-User}:{DB-password}@{host-name}:{mongodb-port-in-host}/{Db-name}?{additional-paramers}
  * CRON_DB_CLEAR_EXECUTION_EXPRESSION={cron job interval pattern} - (for more details about cron job check below)
    * example pattern: * * * * * -> run job every one minute
* All expired caches in db will be removed automatically using a cron job
  * a cron job is some set of codes, which run in pre-defined intervals
  * this interval can be adjust in the "env/{env-name}.env -> CRON_DB_CLEAR_EXECUTION_EXPRESSION" env variable
* When cache record size exceed pre-defined limit, some caches will be automatically remove (even they are not expired) by the cron job
  * which caches removed will be decide by the hit count (how much this cache is used)
  * caches with least hit count will be removed first   
