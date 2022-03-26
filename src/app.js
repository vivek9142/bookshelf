// export * from './app.final'

// export * from './app.exercise'

// extra-1 💯 Prefetch the Authenticated App
export * from './app.extra-1'


/*extra-4 - on using npx react-scripts build - will build the application for production mode
AND npx react scripts serve - will host the built app in localhost 

but in this hosted app we're not able to get profiles data 
this is acutally intentional adding performance measurements will degrade the performance by small amts 

so they don't enable the profiler by default for production but for performance monitoring we do need 
to enable it 

so we just need to pass a flag to make this happen in CRA
    npx react-scripts build --profile

now profiling will be enabled with small performance degradation and we'll get profiling updats in our 
application
*/

/*
extra-5 - we're providing the metadata here but we need interaction where we
know which user action triggered the re-render. so for that we need to enable  interaction tracing

goto status-buttons.extra-4.js

extra-5-2- on sending updates we're not getting the state updates as part of our interactions 
so we need to get those as well 
we can see the interactions iun profiler graph sections also after wraping the states in wrap here
goto hooks.extra-4.js

and another part import unstable_wrap,unstable_trace into profiler comp and using it wherever we want
goto profiler.extra4.js, hooks.extra4 and status-buttons.extra4
*/