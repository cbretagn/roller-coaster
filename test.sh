#!/bin/bash

DIRECTORY="samples"

files=( "1_simple_case" "2_1000_groups_of_few_people" "3_the_same_groups_go_on_the_ride_several_times_during_the_day" "4_all_the_people_get_on_the_roller_coaster_at_least_once" "5_high_earnings_during_the_day" "6_works_with_a_large_dataset" "7_hard" "8_harder" )

results=( "7" "3935" "15" "15000" "4999975000" "89744892565569" "8974489271113753" "89744892714152289")

for i in `seq 0 7`
do
    OUTPUT=$(node rollerCoaster.js ${DIRECTORY}/${files[i]}.txt);
    if [ ${OUTPUT} == ${results[i]} ]
    then
        printf "Ok !\n";
    else
        printf "You found ${OUTPUT} and you should have found ${results[i]}\n"
    fi
done