import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

while True:
    ret, frame = cap.read()

    if not ret:
        print("Error: Could not read frame.")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # detect faces in the grayscale frame
    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(45, 45)
    )

    eyes = eye_cascade.detectMultiScale(gray, scaleFactor=1.35, minNeighbors=5, minSize=(20, 20))

    # draw rectangles
    for x, y, w, h in faces:
        cv2.rectangle(gray, (x, y), (x + w, y + h), (255, 255, 255), 12)

    for x, y, w, h in eyes:
        cv2.rectangle(gray, (x, y), (x + w, y + h), (255, 255, 255), 12)

    cv2.imshow("Face Detection (Grayscale)", gray)

    # break the loop when 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
