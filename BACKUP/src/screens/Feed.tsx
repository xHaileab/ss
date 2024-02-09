import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// Define an interface for the structure of a post
interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded: {
    'wp:featuredmedia': [{ source_url: string }];
  };
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://janderebaw.org/wp-json/wp/v2/posts?_embed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderPost = ({ item }: { item: Post }) => {
    const imageUri = item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0].source_url
      ? item._embedded['wp:featuredmedia'][0].source_url
      : 'https://janderebaw.org/wp-content/uploads/2023/10/Jan-Logo.png'; // Fallback image URI

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.title}>{item.title.rendered}</Text>
        <Text style={styles.excerpt}>{item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        <TouchableOpacity onPress={() => {/* Implement navigation to detailed post view */}}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  excerpt: {
    marginTop: 8,
  },
  readMore: {
    color: 'blue',
    marginTop: 8,
  },
});

export default Feed;
