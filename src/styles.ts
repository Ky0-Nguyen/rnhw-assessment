import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBody: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  mainContainer: {
    flex: 1,
    padding: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  picker: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 4,
  },
  cardView: {
    flex: 1,
    padding: 8,
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 8,
    width: Dimensions.get('screen').width - 32,
  },
  itemView: {
    flexDirection: 'row',
  },
  itemText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },
  itemFlag: {
    width: 50,
    height: 50,
    textAlign: 'center',
  },
});
