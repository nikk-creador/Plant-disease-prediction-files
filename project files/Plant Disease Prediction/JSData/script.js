let model;
let class_indices;
let fileUpload = document.getElementById('uploadImage')
let img = document.getElementById('image')
let boxResult = document.querySelector('.box-result')
let pconf = document.querySelector('.box-result p')
function softmax(arr) {
    return arr.map(function(value,index) { 
      return Math.exp(value) / arr.map( function(y /*value*/){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
    })
}
        
        let progressBar = 
            new ProgressBar.Circle('#progress', {
            color: 'limegreen',
            strokeWidth: 10,
            duration: 2000, // milliseconds
            easing: 'easeInOut'
        });

        async function fetchData(){
            let response = await fetch('./labels.json');
            let data = await response.json();
            data = JSON.stringify(data);
            data = JSON.parse(data);
            return data;
        }

        async function initialize() {
            let status = document.querySelector('.init_status')
            status.innerHTML = 'Loading Model .... <span class="fa fa-spinner fa-spin"></span>'
            model = await tf.loadGraphModel('http://127.0.0.1:5500/TFJS/model.json');
            status.innerHTML = 'Model Loaded Successfully  <span class="fa fa-check"></span>'
        }

        async function predict() {
            let img = document.getElementById('image')
            let offset = tf.scalar(255)
            let tensorImg_scaled =   tf.browser.fromPixels(img).resizeNearestNeighbor([150, 150]).toFloat().expandDims();
           
            prediction = await model.predict(tensorImg_scaled).data();
           
            fetchData().then((data)=> 
                {
                    prediction = softmax(prediction)
                    predicted_class = tf.argMax(prediction)
                    class_idx = Array.from(predicted_class.dataSync())[0]
                    document.querySelector('.pred_class').innerHTML = data[class_idx]
                    document.querySelector('.inner').innerHTML = `${parseFloat(prediction[class_idx]*100).toFixed(2)}% SURE`
                    console.log(data)
                    console.log(data[class_idx])
                    console.log(prediction)

                    progressBar.animate(prediction[class_idx]-0.005); 
                    if(class_idx==0)
                    {
                        document.getElementById("message").innerHTML = "Apple scab is a fungal disease that affects the leaves, fruit, and twigs of apple trees. The best way to control apple scab is through a combination of cultural practices and fungicides. Cultural practices include selecting scab-resistant apple varieties, pruning and thinning trees to increase air circulation, and raking and destroying fallen leaves in the fall. Fungicides can be applied as preventative measures or to control active infections. It's important to follow the manufacturer's instructions and to rotate fungicides to reduce the risk of resistance.";
                       

                    }
                    else if(class_idx==1)
                    {
                        document.getElementById("message").innerHTML =  "Apple black rot is a fungal disease that affects apples and other fruit trees. The fungus infects the fruit, twigs and branches, causing cankers and fruit rot. The best way to control black rot is through a combination of cultural practices and fungicides. Cultural practices include selecting black rot-resistant apple varieties, pruning and thinning trees to increase air circulation, and removing and destroying infected fruit and twigs. Fungicides can be applied as preventative measures or to control active infections. It's important to follow the manufacturer's instructions and to rotate fungicides to reduce the risk of resistance. Regular monitoring and prompt removal of infected fruit, twigs and branches can also help prevent the spread of the disease.";
                       
                    }
                       else if(class_idx==2)
                    {
                        document.getElementById("message").innerHTML =  "Apple cedar rust is a fungal disease caused by the fungus Gymnosporangium juniperi-virginianae. The best way to control cedar rust is through a combination of cultural practices and fungicides. Cultural practices includePlanting apple varieties that are resistant to cedar rust .Pruning and thinning trees to increase air circulation and reduce humidity.Removing and destroying infected leaves, twigs, and fruit.Fungicides can also be applied as a preventative measure or to control active infections. It's important to follow the manufacturer's instructions and to rotate fungicides to reduce the risk of resistance. Regular monitoring and prompt removal of infected leaves, twigs, and fruit can also help prevent the spread of the disease.It's important to note that cedar rust cannot be completely eliminated, but the above-mentioned practices can help to manage and reduce the severity of the disease.";
                    }
                       else if(class_idx==3)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                    
                       else if(class_idx==4)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                     
                       else if(class_idx==5)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY"
                    }
                       else if(class_idx==6)
                    {
                        document.getElementById("message").innerHTML = "This disease is not fatal but will defoliate the newer growth. There are two ways to control this. Firstly, the non-chemical way is to prune off the infected growth and dispose of well away from the infected plants. The second way is to spray with an approved fungicide.  Mid- and late-season sweet cherry (Prunus avium) cultivars are commonly affected, rendering them unmarketable due to the covering of white fungal growth on the cherry surface. Season long disease control of both leaves and fruit is critical to minimize overall disease pressure in the orchard and consequently to protect developing fruit from accumulating spores on their surfaces."
                    }
                       else if(class_idx==7)
                    
                    {
                        document.getElementById("message").innerHTML ="Corn cercospora leaf spot, also known as gray leaf spot, is a fungal disease that affects corn plants. It causes small, round or elongated spots on the leaves that are gray or brown in color and have a purple or red border. The spots can grow and merge, causing the leaves to turn yellow and eventually die. The disease can also affect the stalks, causing them to become weak and more susceptible to lodging.The fungus Cercospora zeae-maydis is the causative agent of this disease and it is spread by spores that are carried by wind and rain. The disease is most common in warm and humid conditions and can be more severe during prolonged periods of leaf wetness.To prevent and cure corn cercospora leaf spot, it's essential to use resistant varieties of corn, practice crop rotation, and avoid overcrowding of the plants. Also, it's important to maintain proper field sanitation by removing and destroying infected plant debris, and avoiding excessive nitrogen fertilization. Fungicide treatments can also be used, but it's important to follow the label instructions and to rotate fungicides to prevent the development of resistance.";
                    }
                       else if(class_idx==8)
                    {
                        document.getElementById("message").innerHTML = "Common rust produces rust-colored to dark brown, elongated pustules on both leaf surfaces. The pustules contain rust spores (urediniospores) that are cinnamon brown in color. Pustules darken as they age. Leaves, as well as sheaths, can be infected. Under severe conditions leaf chlorosis and death may occur. The best management practice is to use resistant corn hybrids. Fungicides can also be beneficial, especially if applied early when few pustules have appeared on the leaves."
                    }
                       else if(class_idx==9)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY."
                        
                    }
                       else if(class_idx==10)
                    {
                        document.getElementById("message").innerHTML = "Northern leaf blight in corn is a bigger problem for large farms than for home gardeners, but if you grow corn in your Midwestern garden, you may see this fungal infection. Northern corn leaf blight is an infection caused by a fungus that is fairly common in the Midwest, wherever corn is grown. The disease generally only causes limited damage, but it may lead to crop loss under certain conditions.";
                    } 
                       else if(class_idx==11)
                    {
                        document.getElementById("message").innerHTML = "Grape black rot is a fungal disease that affects grapevines. It causes black, sunken cankers on the bark and branches of the vine, as well as black, shriveled fruit. The disease can also cause the leaves to turn yellow and fall off prematurely. The fungus Guignardia bidwellii is the causative agent of this disease, and it is spread by spores that are carried by wind and rain. The disease is most common in warm, humid conditions and can be more severe during prolonged periods of leaf wetness. To prevent and cure grape black rot, it's essential to use disease-resistant grape varieties, practice crop rotation, and maintain proper vineyard sanitation by removing and destroying infected plant debris. It's also important to avoid overcrowding the vines and to provide adequate air circulation to reduce humidity. Fungicide treatments can also be used, but it's important to follow the label  instructions and to rotate fungicides to prevent the development of resistance. Additionally, it's important to monitor the vineyard regularly and take appropriate action early in the growing season, before the disease can cause significant damage.";
                    }
                         else if(class_idx==12)
                    {
                        document.getElementById("message").innerHTML = "The stripes, which start out as dark red in red cultivars and yellow in white cultivars, dry and become necrotic. Foliar symptoms may occur at any time during the growing season, but are most prevalent during July and August. The appearance of foliar and especially fruit symptoms is inconsistent from year to year, which is thought to be due to possibly climate-induced variability in toxin production by the pathogen. A severe form of Esca known as apoplexy, which is more common in Europe, results in a sudden dieback of the entire shoot or adjacent shoots, rather than a gradual development of foliar symptoms. resently, there are no effective management strategies for measles. Raisins affected by measles will be discarded during harvest or at the packing house, while table grape growers will leave affected fruit on the vine. ";
                    }
                         else if(class_idx==13)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                         else if(class_idx==14)
                    {
                        document.getElementById("message").innerHTML = "Bacterial blight of grapevine is a serious, chronic and systemic disease of grapevine that affects commercially important cultivars. Apply dormant sprays to reduce inoculum levels. Cut it out. Open up that canopy. Don't let down your defenses.  Scout early, scout often. Use protectant and systemic fungicides. Consider fungicide resistance. Watch the weather.";
                    }
                         else if(class_idx==15)
                    {
                        document.getElementById("message").innerHTML = " is one of the most serious citrus plant diseases in the world. It is also known as Huanglongbing (HLB) or yellow dragon disease. Once a tree is infected, there is no cure. Now, as then, oranges and other citrus fruits are delicious snacks that deliver powerful nutrients and antioxidants and provide multiple health benefits, such as reducing the risk of some cancers, stroke, and cardiovascular disease.";
                    }
                         else if(class_idx==16)
                    {
                        document.getElementById("message").innerHTML = "Peach bacterial spot is a bacterial disease that affects peach trees. It causes small, circular, reddish-brown to black spots on the leaves, twigs, and fruit of the tree. The spots can become larger and merge, causing the leaves to turn yellow and fall off prematurely. The fruit can also be affected, becoming deformed and unmarketable. The bacterium Xanthomonas arboricola pv. pruni is the causative agent of this disease, and it is spread by water, rain, and wind. The disease is most common in warm and humid conditions and can be more severe during prolonged periods of leaf wetness.To prevent and cure peach bacterial spot, it's essential to use disease-resistant peach varieties, practice crop rotation, and maintain proper orchard sanitation by removing and destroying infected plant debris. It's also important to avoid overcrowding the trees and to provide adequate air circulation to reduce humidity. Copper-based fungicides can also be used to control the disease, but it's important to follow the label instructions and to rotate fungicides to prevent the development of resistance. Additionally, it's important to monitor the orchard regularly and take appropriate action early in the growing season, before the disease can cause significant damage.";
                    }
                         else if(class_idx==17)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                         else if(class_idx==18)
                    {
                        document.getElementById("message").innerHTML = "A plant with bacterial spot cannot be cured. Remove symptomatic plants from the field or greenhouse to prevent the spread of bacteria to healthy plants. Burn, bury or hot compost the affected plants and do not eat symptomatic fruit.But there are some ways we you can go through: Using resistant varieties, Disaese management or Seed and Foliage treatments. ";
                    }
                         else if(class_idx==19)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                         else if(class_idx==20)
                    {
                        document.getElementById("message").innerHTML = "Potato early blight, also known as Alternaria solani, is a fungal disease that affects potato plants. The fungus causes leaf spots, wilting, and fruit rot. The best way to control potato early blight is through a combination of cultural practices and fungicides. Cultural practices include:Choosing disease-resistant potato varieties.Rotating crops to avoid planting potatoes in the same location year after year.Maintaining optimal soil moisture and fertility.Removing and destroying infected plant debris to reduce the chance of infection.Fungicides can be applied as preventative measures or to control active infections. It's important to follow the manufacturer's instructions and to rotate fungicides to reduce the risk of resistance. Regular monitoring and prompt removal of infected plant debris can also help prevent the spread of the disease";
                    }
                         else if(class_idx==21)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY.";
                    }
                    else if(class_idx==22)
                    {
                        document.getElementById("message").innerHTML = "Potato late blight, also known as Phytophthora infestans, is a fungal disease that affects potato plants and tomatoes. The fungus causes leaf spots, wilting, and fruit rot. The best way to control potato late blight is through a combination of cultural practices and fungicides. Cultural practices include,Choosing disease-resistant potato varieties.Rotating crops to avoid planting potatoes in the same location year after year.Maintaining optimal soil moisture and fertility.Removing and destroying infected plant debris to reduce the chance of infection.Avoiding overhead irrigation and instead using drip irrigation or watering the base of the plant.Fungicides can be applied as preventative measures or to control active infections. It's important to follow the manufacturer's instructions and to rotate fungicides to reduce the risk of resistance. Regular monitoring and prompt removal of infected plant debris can also help prevent the spread of the disease. Late blight is a highly destructive disease and it's important to take preventative measures early, such as crop rotation, good sanitation, and use of disease-resistant varieties to reduce the risk of infection.";
                    }
                    else if(class_idx==23)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                    else if(class_idx==24)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY";
                    }
                    else if(class_idx==25)
                    {
                        document.getElementById("message").innerHTML = "A better treatment solution for your squash plants is baking soda. Baking soda is an excellent option for treating powdery mildew. It is readily available in your home and will not cause any harm to the surrounding vegetable plants. With the baking soda method, you will also need some cooking oil and some dish soap. Potassium bicarbonate, similar to baking soda, this has the unique advantage of actually eliminating powdery mildew once it's there. Potassium bicarbonate is a contact fungicide which kills the powdery mildew spores quickly.";
                    }
                    else if(class_idx==26)
                    {
                        document.getElementById("message").innerHTML = "IT IS HEALTHY.";
                    }
                       else if(class_idx==27)
                    {
                        document.getElementById("message").innerHTML = "Leaf scorch is caused by the fungus Diplocarpon earliana. Symptoms of leaf scorch consist of numerous small, irregular, purplish spots or “blotches” that develop on the upper surface of leaves. The centers of the blotches become brownish";
                    }
                    
                    
                    else{
                        document.getElementById("message").innerHTML = "error";
                    }
  
  
                   
                }
            );
            
        }

        

        fileUpload.addEventListener('change', function(e){
            
            let uploadedImage = e.target.value
            if (uploadedImage){
                document.getElementById("blankFile-1").innerHTML = uploadedImage.replace("C:\\fakepath\\","")
                document.getElementById("choose-text-1").innerText = "Change Selected Image"
                document.querySelector(".success-1").style.display = "inline-block"

                let extension = uploadedImage.split(".")[1]
                if (!(["doc","docx","pdf"].includes(extension))){
                    document.querySelector(".success-1 i").style.border = "1px solid limegreen"
                    document.querySelector(".success-1 i").style.color = "limegreen"
                }else{
                    document.querySelector(".success-1 i").style.border = "1px solid rgb(25,110,180)"
                    document.querySelector(".success-1 i").style.color = "rgb(25,110,180)"
                }
            }
            let file = this.files[0]
            if (file){
                boxResult.style.display = 'block'
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener("load", function(){
                    
                    img.style.display = "block"
                    img.setAttribute('src', this.result);
                });
            }

            else{
            img.setAttribute("src", "");
            }

            initialize().then( () => { 
                predict()
            })
        })


        