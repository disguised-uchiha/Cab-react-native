import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Caption, Headline } from 'react-native-paper';
import TourCard from '../components/TourCard';
import { ScreenNavProps } from '../types/ScreenParamList';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

interface TourObj {
  expectedAmount: string;
  from: string;
  to: string;
  passengerName: string;
  requiredSeats: string;
  passengerPhoneNumber: string;
}
function TourList({ navigation }: ScreenNavProps<'TourList'>) {
  const [tours, setTours] = useState<TourObj[]>();

  useEffect(() => {
    const doc = firebase.firestore().collection('tours');
    const observer = doc.onSnapshot(
      (docSnapshot) => {
        const fetchedTourList: TourObj[] = [];
        docSnapshot.forEach((item) => fetchedTourList.push(item.data() as TourObj));
        setTours(fetchedTourList);
        console.log(tours);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
    // return () => {
    //   observer
    // }
  }, []);
  return (
    <View style={{ padding: 20, alignItems: 'center', height: '100%' }}>
      <View style={{ height: 40 }} />
      <Headline style={{ color: '#FFD428', fontWeight: '700' }}>Hello Driver</Headline>
      <Caption style={{ color: '#808080' }}>Let's pick someone</Caption>
      <Text style={{ marginTop: 20, marginBottom: 10 }}>Pick up request near you</Text>
      {/* <TourCard
        onAccept={() => navigation.navigate('AcceptTour')}
        expectedAmount='444'
        from='thane'
        to='bhandup'
        passengerName='harsh'
        passengerPhoneNumber='12323123'
        requiredSeats='5'
      /> */}
      <FlatList
        data={tours}
        renderItem={({ item }) => (
          <TourCard
            onAccept={() => navigation.navigate('AcceptTour')}
            expectedAmount={item.expectedAmount}
            from={item.from}
            to={item.to}
            passengerName={item.passengerName}
            passengerPhoneNumber={item.passengerPhoneNumber}
            requiredSeats='5'
          />
        )}
        style={{ width: '100%' }}
        keyExtractor={(item) => uuidv4()}
      />
    </View>
  );
}

export default TourList;
