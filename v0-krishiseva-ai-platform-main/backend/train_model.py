import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import pickle

# Load dataset
df = pd.read_csv('Crop_recommendation.csv')

# Features and target
features = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
target = df['label']

# Split
Xtrain, Xtest, Ytrain, Ytest = train_test_split(
    features, target, test_size=0.2, random_state=2
)

# Train Random Forest
RF = RandomForestClassifier(n_estimators=20, random_state=0)
RF.fit(Xtrain, Ytrain)

# Print accuracy
predicted_values = RF.predict(Xtest)
x = metrics.accuracy_score(Ytest, predicted_values)
print(f"Random Forest Accuracy: {x * 100:.2f}%")

# Save model
with open('RandomForest.pkl', 'wb') as f:
    pickle.dump(RF, f)

# Save all crop labels
labels = list(RF.classes_)
with open('labels.pkl', 'wb') as f:
    pickle.dump(labels, f)

print("Model saved successfully!")
print("Crops the model can predict:", labels)