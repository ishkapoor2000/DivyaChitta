import pandas as pd
import streamlit as st
import pickle
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import accuracy_score
from sklearn.neural_network import MLPClassifier
medi=pd.read_csv('meditations.csv')
medi=medi.drop('id',axis=1)
X=medi.drop('playlist',axis=1)
y=medi['playlist']
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=0)
neigh = KNeighborsRegressor(n_neighbors=1)
neigh.fit(X_train,y_train)
predict_KNN=neigh.predict(X_test)
print(predict_KNN.round())
score=neigh.score(X_train,y_train)
print(score)
pickle.dump(neigh, open("webaapp.pkl", "wb"))
print(medi.columns)

st.set_page_config(page_title="Music recommendation", page_icon="https://image.flaticon.com/icons/png/16/3612/3612293.png")

# 4:-soothing, 2:-happy, 3:-relaxing, 1:-focused, 0:- calm
happy = ["https://happy-music-playlist.ishkapoor.repl.co/", "https://image0.flaticon.com/icons/png/128/4566/4566044.png"]
calm = ["https://calm-music-playlist.ishkapoor.repl.co/", "https://image.flaticon.com/icons/png/128/983/983033.png"]
relaxing = ["https://relaxing-music-playlist.ishkapoor.repl.co/", "https://image.flaticon.com/icons/png/128/2395/2395687.png"]
focused = ["https://focused-music-playlist.ishkapoor.repl.co/", "https://image.flaticon.com/icons/png/128/334/334323.png"]
soothing = ["https://Soothing-Music-Playlist.ishkapoor.repl.co", "https://image.flaticon.com/icons/png/128/3220/3220587.png"]
webapp = ["https://www.instagram.com/", "https://image.flaticon.com/icons/png/512/2177/2177275.png"]
logo = "https://image.flaticon.com/icons/png/128/3612/3612293.png"

dataset_name = st.sidebar.selectbox(
    'Select YES to proceed or NO to go back',
    ('Yes', 'No')
)
if dataset_name == 'Yes':
    st.write("""
    #    Welcome!
        """)
    st.header("Divya Chitta")
    st.write(" This webapp helps you to remove the uneccesary negative aura in your life")
    c=st.selectbox(' 🚀 Do you sometimes feel anxiety?',('yes','no'))
    v = st.selectbox(' 🚀 Do you overthink alot?', ('yes', 'no'))
    k=st.selectbox(' 🚀 Do you tend to sleep alot?',('yes','no'))
    z = st.selectbox(' 🚀 Do you sometimes feel that you are confused about the trivial things?', ('yes', 'no'))
    l = st.selectbox(' 🚀 Do you practice meditation often?', ('yes', 'no'))
    n = st.selectbox(' 🚀 Do you feel positive all the time?', ('yes', 'no'))
    o = st.selectbox(' 🚀 Can you say you feel happy all the time?', ('yes', 'no'))
    list=[c, v, k, z, l, n, o]
    for i in range(len(list)):
        if list[i] == "yes":
            list[i]=1
        else:
            list[i]=0

    x = np.array(list,dtype='float').reshape(1, -1)

    loaded_model = pickle.load(open("webaapp.pkl", "rb"))
    pred = loaded_model.predict(x)
    x[:] = np.zeros([1, 7])

    # 4:-soothing, 2:-happy, 3:-relaxing, 1:-focused, 0:- calm
    if pred == 0:
        st.title('You should look into our Calm music playlist   ')
        st.title('👇')
        calm_markdown = "[![](" + calm[1] + ")](" + calm[0] + ")"
        st.markdown(calm_markdown)
    elif pred == 1:
        st.title('You should look into our Focused music playlist     ')
        st.title('👇')
        focused_markdown = "[![](" + focused[1] + ")](" + focused[0] + ")"
        st.markdown(focused_markdown)
    elif pred == 2:
        st.title('You should look into our Happy music playlist    ')
        st.title('👇')
        happy_markdown = "[![](" + happy[1] + ")](" + happy[0] + ")"
        st.markdown(happy_markdown)
    elif pred == 3:
        st.title('You should look into our Relaxing  music playlist      ')
        st.title('👇')
        relaxing_markdown = "[![](" + relaxing[1] + ")](" + relaxing[0] + ")"
        st.markdown(relaxing_markdown)
    elif pred == 4:
        st.title('You should look into our Soothing music playlist     ')
        st.title('👇')
        soothing_markdown = "[![](" + soothing[1] + ")](" + soothing[0] + ")"
        st.markdown(soothing_markdown)

else:
    st.title('You can also check other options in our Webapp.')
    webapp_markdown = "[![](" + webapp[1] + ")](" + webapp[0] + ")"
    st.markdown(webapp_markdown)
