import { useEffect, useRef, useState, ChangeEvent } from "react";
import Head from "next/head";
import anime from "animejs";
// import * as tf from "@tensorflow/tfjs";

// type Model = tf.LayersModel;

// interface ClassificationResult {
//   label: string;
//   confidence: string;
// }

// interface ImageUploadProps {
//   onUpload: (file: File) => void;
// }

// interface DisplayResultsProps {
//   results: ClassificationResult[];
//   imageSrc: string;
// }

// const loadModel = async (): Promise<Model> => {
//   const model = await tf.loadLayersModel(
//     "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
//   );
//   return model;
// };

// const ImageUpload = ({ onUpload }: ImageUploadProps) => {
//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       onUpload(file);
//     }
//   };

//   return <input type="file" accept="image/*" onChange={handleImageChange} />;
// };

// const classifyImage = async (
//   model: Model,
//   imageElement: HTMLImageElement
// ): Promise<ClassificationResult[]> => {
//   const tensor = tf.browser
//     .fromPixels(imageElement)
//     .resizeNearestNeighbor([224, 224])
//     .toFloat()
//     .expandDims();
//   const predictions = (await model.predict(tensor)) as tf.Tensor<tf.Rank>;
//   return Array.from(predictions.dataSync()).map((value, index) => ({
//     label: `Class ${index + 1}`,
//     confidence: value.toFixed(3),
//   }));
// };

// const DisplayResults = ({ results, imageSrc }: DisplayResultsProps) => {
//   // Find the result with the highest confidence
//   const highestConfidenceResult = results.reduce((prev, current) => {
//     return prev.confidence > current.confidence ? prev : current;
//   });

//   console.log(highestConfidenceResult);

//   return (
//     <div className="results-container flex">
//       <img src={imageSrc} alt="Uploaded" className="w-48 h-48 object-contain" />
//       <div>
//         <p>{`Highest Confidence Prediction: ${highestConfidenceResult.label} with confidence ${highestConfidenceResult.confidence}`}</p>
//       </div>
//     </div>
//   );
// };

function Projects() {
  const funRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const [model, setModel] = useState<Model | null>(null);
  // const [results, setResults] = useState<ClassificationResult[]>([]);
  // const [imageSrc, setImageSrc] = useState<string | null>(null);

  // useEffect(() => {
  //   loadModel().then(setModel).catch(console.error);
  // }, []);

  // const handleImageUpload = async (file: File) => {
  //   const reader = new FileReader();
  //   reader.onload = async (e: ProgressEvent<FileReader>) => {
  //     if (e.target?.result) {
  //       setImageSrc(e.target.result as string);
  //       const img = new Image();
  //       img.src = e.target.result as string;
  //       img.onload = async () => {
  //         try {
  //           const classificationResults = await classifyImage(model!, img);
  //           setResults(classificationResults);
  //         } catch (error) {
  //           console.error("Error in classification:", error);
  //         }
  //       };
  //       img.onerror = () => console.error("Error loading image");
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };

  useEffect(() => {
    // Function to move the bubble away from the mouse pointer
    const avoidMouse = (event: MouseEvent) => {
      if (funRef.current && containerRef.current) {
        const bubble = funRef.current;

        // Get the mouse position relative to the page
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        // Get the position and dimensions of the bubble
        const bubbleRect = bubble.getBoundingClientRect();
        const bubbleX = bubbleRect.left + window.scrollX + bubbleRect.width / 2;
        const bubbleY = bubbleRect.top + window.scrollY + bubbleRect.height / 2;

        // Calculate the distance from the center of the bubble to the mouse
        const distanceX = mouseX - bubbleX;
        const distanceY = mouseY - bubbleY;

        // Determine the new position, with a max distance constraint
        const maxDistance = 200; // Increased max distance to move the bubble
        const avoidanceFactor = 20; // Increased for more "avoidance"
        let translateX = (distanceX > 0 ? -1 : 1) * maxDistance;
        let translateY = (distanceY > 0 ? -1 : 1) * maxDistance;

        // Apply the transformation with anime.js
        anime({
          targets: bubble,
          translateX: translateX,
          translateY: translateY,
          duration: 200, // Reduced duration for faster movement
          easing: "easeOutQuad",
        });
      }
    };

    // Add mouse move event listener to the container
    document.addEventListener("mousemove", avoidMouse);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousemove", avoidMouse);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Anri Lombard - Fun</title>
        <meta
          name="description"
          content="Built projects and open source contributions"
        />
      </Head>
      <div className="min-h-screen flex flex-col mx-10" ref={containerRef}>
        <div className="page-intro m-auto" ref={funRef}>
          Fun
        </div>

        <div className="box-container md:m-10 mt-10 grid md:grid-cols-2 gap-4">
          {/* Here to add ml projects */}
        </div>
      </div>
    </>
  );
}

export default Projects;
