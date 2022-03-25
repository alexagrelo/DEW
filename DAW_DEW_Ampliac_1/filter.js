// *****************************************
// **************  FILTRO  *****************
// *****************************************
const routeFilter = (AGE, HEIGHT) => {

    let min_age, max_age, min_height, max_height;

    //Cargamos en el array filteredRoute las atracciones que cumplen los criterios
    const filteredRoute = ATTRACTIONS.filter(attraction => {

        min_age = true;
        max_age = true;
        min_height = true;
        max_height = true;

        if(attraction.min_age_years) min_age = AGE >= attraction.min_age_years;
        if(attraction.max_age_years) max_age = AGE <= attraction.max_age_years;
        if(attraction.min_height_cm) min_height = HEIGHT >= attraction.min_height_cm;
        if(attraction.max_height_cm) max_height = HEIGHT <= attraction.max_height_cm;
        
        return (min_age && max_age && min_height && max_height);

    });

    return filteredRoute;

}

